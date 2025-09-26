// src/repositories/SupabaseRepository.js
const { supabase } = require('../config/database');

class SupabaseRepository {
  constructor(tableName, { idField = 'uuid', textSearchFields = [] } = {}) {
    this.table = tableName;
    this.idField = idField;
    this.textSearchFields = textSearchFields;
  }

  _parseQueryFilters(query) {
    const filters = {};
    let order = null;

    for (const key in query) {
      const value = query[key];

      // Ordenação
      if (key === 'order') {
        order = value.split(',').map(f => {
          const [field, dir] = f.split('.');
          return { field, direction: dir || 'asc' };
        });
        continue;
      }

      // IN
      if (key.endsWith('_in')) {
        filters[key.replace('_in', '')] = { operator: 'in', value: value.split(',') };
        continue;
      }

      // Between
      if (key.endsWith('_between')) {
        const [start, end] = value.split(',');
        filters[key.replace('_between', '')] = { operator: 'between', value: [start, end] };
        continue;
      }

      // Comparações
      const operators = ['_gte', '_lte', '_gt', '_lt'];
      const foundOp = operators.find(op => key.endsWith(op));
      if (foundOp) {
        let operator;
        switch (foundOp) {
          case '_gte': operator = '>='; break;
          case '_lte': operator = '<='; break;
          case '_gt': operator = '>'; break;
          case '_lt': operator = '<'; break;
        }
        filters[key.replace(foundOp, '')] = { operator, value };
        continue;
      }

      // Like / ilike
      if (key.endsWith('_like') || key.endsWith('_ilike')) {
        const field = key.replace(/_like$|_ilike$/, '');
        const operator = key.endsWith('_ilike') ? 'ilike' : 'like';
        filters[field] = { operator, value };
        continue;
      }

      // Igualdade padrão
      filters[key] = { operator: '=', value };
    }

    return { filters, order };
  }

  _applyFilter(query, filter = {}) {
    Object.entries(filter).forEach(([key, val]) => {
      if (!val || val.value === undefined || val.value === null) return;

      const { operator, value } = val;

      switch (operator) {
        case '=': query = query.eq(key, value); break;
        case '>=': query = query.gte(key, value); break;
        case '<=': query = query.lte(key, value); break;
        case '>': query = query.gt(key, value); break;
        case '<': query = query.lt(key, value); break;
        case 'like': query = query.like(key, value); break;
        case 'ilike': query = query.ilike(key, value); break;
        case 'in': query = query.in(key, value); break;
        case 'between': query = query.gte(key, value[0]).lte(key, value[1]); break;
      }
    });
    return query;
  }

  async list({ query = {}, start = 0, limit = 100, select = '*' } = {}) {
    const { filters, order } = this._parseQueryFilters(query);
    let q = supabase.from(this.table).select(select, { count: 'exact' });
    q = this._applyFilter(q, filters);

    if (order) {
      order.forEach(o => {
        q = q.order(o.field, { ascending: o.direction === 'asc' });
      });
    }

    const { data, error, count } = await q.range(start, start + limit - 1);
    if (error) throw Object.assign(new Error(error.message), { status: 400 });
    return { start, count: data.length, total: count ?? data.length, items: data };
  }

  async getById(id, { select = '*' } = {}) {
    const { data, error } = await supabase.from(this.table).select(select).eq(this.idField, id).maybeSingle();
    if (error) throw Object.assign(new Error(error.message), { status: 400 });
    return data || null;
  }

  async findOne(filter = {}, { select = '*' } = {}) {
    const { filters } = this._parseQueryFilters(filter);
    let query = supabase.from(this.table).select(select).limit(1);
    query = this._applyFilter(query, filters);
    const { data, error } = await query.maybeSingle();
    if (error) throw Object.assign(new Error(error.message), { status: 400 });
    return data || null;
  }

  async create(payload, { select = '*' } = {}) {
    const { data, error } = await supabase.from(this.table).insert(payload).select(select).maybeSingle();
    if (error) throw Object.assign(new Error(error.message), { status: 400 });
    return data;
  }

  async update(id, payload, { select = '*' } = {}) {
    const { data, error } = await supabase.from(this.table).update(payload).eq(this.idField, id).select(select).maybeSingle();
    if (error) throw Object.assign(new Error(error.message), { status: 400 });
    return data;
  }

  async remove(id, { select = '*' } = {}) {
    const { data, error } = await supabase.from(this.table).delete().eq(this.idField, id).select(select).maybeSingle();
    if (error) throw Object.assign(new Error(error.message), { status: 400 });
    return data;
  }
}

module.exports = SupabaseRepository;
