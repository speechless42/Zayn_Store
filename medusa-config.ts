import { loadEnv, defineConfig } from '@medusajs/framework/utils'
import { allowed } from '@medusajs/medusa/api/admin/customers/query-config'
loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  plugins:[
    {
      resolve:"newbay-plugins",
      options:{
        
      }
    }
  ],
  modules:[
    {
      resolve:"@medusajs/medusa/payment",
      options:{
        providers:[
          {
            resolve:"newbay-plugins/providers/newebpay",
            id:"newebpay",
            options:{
              _hash_key:process.env.NEWEBPAY_KEY,
              _hash_iv:process.env.NEWEBPAY_IV,
              _mid:process.env.NEWEBPAY_MID,
            }
          }
        ]
      }
    }
  ],
  admin:{
      vite:()=>{
        return{
          server:{
            allowedHosts:['258352766113.ngrok-free.app']
          }
        }
      }
    },
})
