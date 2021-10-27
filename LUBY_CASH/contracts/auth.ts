/**
 * Contract source: https://git.io/JOdz5
 *
 * Feel free to let us know via PR, if you find something broken in this
 * file.
 */

import Admin from 'App/Models/Admin'
import User from 'App/Models/User'

declare module '@ioc:Adonis/Addons/Auth' {
  interface ProvidersList {
    user: {
      implementation: LucidProviderContract<typeof User>
      config: LucidProviderConfig<typeof User>
    }
    admin: {
      implementation: LucidProviderContract<typeof Admin>
      config: LucidProviderConfig<typeof Admin>
    }
  }

  interface GuardsList {
    apiUser: {
      implementation: OATGuardContract<'user', 'apiUser'>
      config: OATGuardConfig<'user'>
    }
    apiAdmin: {
      implementation: OATGuardContract<'admin', 'apiAdmin'>
      config: OATGuardConfig<'admin'>
    }
  }
}
