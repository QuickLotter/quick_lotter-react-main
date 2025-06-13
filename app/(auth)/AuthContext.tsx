import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabaseClient"; // ajuste o path se necessário

type User = any;
type Session = any;

type AuthContextType = {
  user: User | null;
  session: Session | null;
  profile: any;
  loading: boolean;
  emailVerified: boolean;
  signUp: (email: string, password: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<any>;
  canAccessApp: () => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [emailVerified, setEmailVerified] = useState(false);

  // Busca perfil do usuário
  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", userId)
      .single();
    if (error) {
      setProfile(null);
      return null;
    }
    setProfile(data);
    return data;
  };

  useEffect(() => {
    // Escuta sessão do usuário
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setEmailVerified(!!session?.user?.confirmed_at);
        setLoading(false);
      }
    );

    // Busca a sessão ao iniciar
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setEmailVerified(!!session?.user?.confirmed_at);
      setLoading(false);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // Busca perfil e status do e-mail sempre que user mudar
  useEffect(() => {
    if (user?.id) {
      fetchUserProfile(user.id);
      setEmailVerified(!!user.confirmed_at);
    } else {
      setProfile(null);
      setEmailVerified(false);
    }
  }, [user]);

  // Métodos principais
  const signUp = async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (data?.user?.id && !error) {
      const { error: prefError } = await supabase
        .from("user_preferences")
        .insert([
          {
            user_id: data.user.id,
            marketing_email_alerts: false,
            marketing_jackpot_alerts: false,
            marketing_strategy_tips: true,
            marketing_game_results: false,
          },
        ]);
      if (prefError) {
        console.log("Erro ao inserir user_preferences:", prefError);
      } else {
        console.log("Registro user_preferences criado com sucesso!");
      }
    } else if (error) {
      console.log("Erro no signup:", error);
    }

    setLoading(false);
    return { data, error };
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    // Após login, atualiza status do e-mail
    setEmailVerified(!!data?.user?.confirmed_at);
    return { data, error };
  };

  const signOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setEmailVerified(false);
    setLoading(false);
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    setLoading(false);
    return { data, error };
  };

  // Checagem de acesso (trial ou assinatura)
  const canAccessApp = () => {
    if (!profile) return false;
    if (profile.is_subscribed) return true;
    const now = new Date();
    const trialEnd = new Date(profile.trial_end);
    return now <= trialEnd;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        emailVerified,
        signUp,
        signIn,
        signOut,
        resetPassword,
        canAccessApp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook para acessar o AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth need to be used inside of AuthProvider");
  return context;
}
