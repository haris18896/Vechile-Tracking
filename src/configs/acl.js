// import React, { useContext } from 'react'
import { AbilityBuilder, Ability } from '@casl/ability'
import useJwt from 'src/auth/jwt/useJwt'

// import { AbilityContext } from 'src/layouts/components/acl/Can'

export const AppAbility = Ability

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (is_super_admin, role, permissions, subject) => {
  // const ability = useContext(AbilityContext)

  const { can, rules } = new AbilityBuilder(AppAbility)

  if (is_super_admin) {
    can('manage', 'all')
  }

  if (role) {
    permissions.forEach(permission => {
      can(permission?.action, permission?.subject)
    })
  } else {
    can(['read', 'create', 'update', 'delete'], subject)
  }

  return rules
}

export const buildAbilityFor = (is_super_admin, role, permissions, subject) => {
  return new AppAbility(defineRulesFor(is_super_admin, role, permissions, subject), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    // detectSubjectType: object => object.type
    detectSubjectType: object => object.constructor
  })
}

export const defaultACLObj = {
  action: 'manage',
  subject: 'all'
}

export default defineRulesFor
