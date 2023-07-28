import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://lacdoufnpsspxncsfmds.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhY2RvdWZucHNzcHhuY3NmbWRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAzNzY3ODQsImV4cCI6MjAwNTk1Mjc4NH0.pWtKYX2mzNEC_7l3MKVf2YzglNKlzndPwL3WQxacDqc"
);

export function signUpWithEmail(username, email, password, callback) {
  supabase.auth
    .signUp({
      email: email,
      password: password,
      options: {
        data: {
          avatar_url:
            "https://www.gravatar.com/avatar/00000000000000000000000000000000",
          username: username,
          email: email,
        },
        emailRedirectTo: "https://localhost:3000",
      },
    })
    .then(({ data, error }) => {
      if (error) console.log(error);

      callback(data, error);
    });
}

export function signInWithEmail(email, password, callback) {
  supabase.auth
    .signInWithPassword({
      email: email,
      password: password,
    })
    .then((data, error) => {
      callback(data, error);
    });
}

export function signOut(callback) {
  supabase.auth.signOut().then((err) => {
    callback(err);
  });
}

export function getSession(callback) {
  supabase.auth.getSession().then((data, error) => {
    if (error) console.error(error);

    callback(data.data, data.error);
  });
}

export function getUserData(callback) {
  getSession((data, error) => {
    console.log(data);

    if (error) {
      console.error(error);
      callback(data.data, error);
    } else {
      supabase
        .from("profiles")
        .select()
        .eq("id", data.session.user.id)
        .then((data, error) => {
          if (error) console.error(error);

          callback(data);
        });
    }
  });
}
