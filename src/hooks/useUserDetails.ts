import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getuserDetilasApi} from "../services/profileDetilasService";
import {error} from "console";

export const useUserDetailsMutation = () => {
  const queryClient = useQueryClient();

  const getUserDetials = useQuery({
    queryKey: ["workspace"],
    queryFn: getuserDetilasApi,
  });

  return {getUserDetials};
};
