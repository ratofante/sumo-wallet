import { reactive } from 'vue';

const state = reactive({
  user: null,
  profile: null
});

const methods = {
  setUser(payload) {
    state.user = payload ? payload.user : null;
  },
  setProfile(data) {
    state.profile = data ?? null;
  }
};

export default {
  state,
  methods
};
