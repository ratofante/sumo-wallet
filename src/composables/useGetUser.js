import { supabase } from '@/supabase';

const useGetUser = async () => {
    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) throw new Error(`Can't get user`);

    return user;
};

export default useGetUser;
