import { defineStore } from 'pinia';

export const useUserStore = defineStore("user", {
  state: () => ({
    userLoggedIn: false,
  }),
  actions: {
    async logingIn() {
      this.userLoggedIn = true;
    },
    async signOut() {
      this.userLoggedIn = false;
    },
  },
});