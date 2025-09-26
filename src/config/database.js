const { createClient } = require('@supabase/supabase-js');
const { env } = require('./env');

class Database {
  constructor() {
    if (!Database.instance) {
      this.supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY, {
        db: { schema: env.SUPABASE_SCHEMA },
        auth: { persistSession: false, autoRefreshToken: false }
      });
      Database.instance = this;
    }
    return Database.instance;
  }

  get client() {
    return this.supabase;
  }
}

module.exports = new Database();
