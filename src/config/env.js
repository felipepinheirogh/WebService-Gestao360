const { z } = require('zod');

const envSchema = z.object({
  PORT: z.coerce.number().default(10000),
  JWT_SECRET: z.string().min(16, 'JWT_SECRET muito curto'),
  SUPABASE_URL: z.string().url(),
  SUPABASE_KEY: z.string().min(10),
  SUPABASE_SCHEMA: z.string().default('public')
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Variáveis de ambiente inválidas:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

module.exports = { env: parsed.data };
