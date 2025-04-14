import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getuserDetilasApi, updateUserProfileApi} from "../services/profileDetilasService";


export const useUserDetailsMutation = () => {
  const queryClient = useQueryClient();

  const getUserDetials = useQuery({
    queryKey: ["workspace",],
    queryFn: getuserDetilasApi,
  });

  
  const updateUserProfile = useMutation({
    mutationFn: (formData: FormData) => updateUserProfileApi(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useDetails"] });
      console.log("data updated successfully")
    },
    onError: (err: any) => {
      console.error("Update failed:", err);
    },
  });

  return {getUserDetials, updateUserProfile};
};









