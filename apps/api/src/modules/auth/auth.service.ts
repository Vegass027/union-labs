import { supabase, supabaseAdmin } from '../../db/client'
import { logger } from '../../utils/logger'
import { AppError, ConflictError, NotFoundError } from '../../utils/errors'
import type { User, UserRole } from '@agency/types'
import type { RegisterInput } from './auth.schema'

export async function registerUser(input: RegisterInput): Promise<{ requiresEmailConfirmation: boolean; user?: User; session?: unknown }> {
  const { email, password, role, fullName, phone } = input

  logger.info({ email, role }, 'Registering new user')

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role,
        full_name: fullName,
        phone: phone || null,
        password_set: true,
      },
    }
  })

  if (authError) {
    logger.error({ error: authError }, 'Supabase auth signup failed')
    throw new AppError(authError.message, 400)
  }

  if (!authData.user) {
    throw new AppError('Failed to create user', 500)
  }

  if (!authData.session) {
    logger.info({ email }, 'Email confirmation required, waiting for user to confirm')
    return { requiresEmailConfirmation: true }
  }

  logger.info({ userId: authData.user.id, email, role }, 'User registered successfully')
  return { user: authData.user as unknown as User, session: authData.session }
}

export async function logoutUser(accessToken: string): Promise<void> {
  const { error } = await supabase.auth.signOut()

  if (error) {
    logger.error({ error }, 'Failed to logout user')
    throw new AppError(error.message, 500)
  }

  logger.info('User logged out successfully')
}

export async function getCurrentUser(userId: string): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error || !data) {
    logger.error({ userId, error }, 'Failed to fetch user')
    throw new NotFoundError('User not found')
  }

  return data
}

export async function updateUserTelegram(userId: string, telegramChatId: string | null): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .update({ telegram_chat_id: telegramChatId })
    .eq('id', userId)
    .select()
    .single()

  if (error || !data) {
    logger.error({ userId, error }, 'Failed to update user telegram_chat_id')
    throw new AppError('Failed to update user', 500)
  }

  logger.info({ userId, telegramChatId }, 'User telegram_chat_id updated')

  return data
}

export async function confirmInvite(userId: string, email: string, role: string, fullName: string): Promise<void> {
  await supabaseAdmin.auth.admin.updateUserById(userId, {
    app_metadata: { role }
  })

  const { error } = await supabaseAdmin.from('users').upsert({
    id: userId,
    email,
    full_name: fullName,
    role,
    password_hash: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }, { onConflict: 'id' })

  if (error) {
    logger.error({ error, userId }, 'Failed to upsert user in confirm-invite')
    throw new AppError('Failed to confirm invite', 500)
  }

  logger.info({ userId, email, role }, 'Invite confirmed successfully')
}
