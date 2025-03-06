import { User, Session } from '@supabase/supabase-js';

export interface AuthSessionState {
  user: User | null;
  session: Session | null;
}
