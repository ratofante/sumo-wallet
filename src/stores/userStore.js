import { reactive } from 'vue';
import { supabase } from '@/supabase';

const state = reactive({
    user: null,
    profile: null
});

const methods = {
    setUser(payload) {
        state.user = payload ? payload.user : null;
    },
    removeUser() {
        state.user = null;
    },
    setProfile(data) {
        state.profile = data ?? null;
    },
    async getAvatarURL() {
        let src;
        if (state.profile.avatar_url) {
            try {
                const { data, error } = await supabase.storage
                    .from('avatars')
                    .download(state.profile.avatar_url);
                if (error) {
                    console.log(`Error: ${error.message}`);
                }
                src = URL.createObjectURL(data);
            } catch (error) {
                console.error('Error downloading image: ', error.message);
            }
            return src;
        }
    }
};

export default {
    state,
    methods
};
