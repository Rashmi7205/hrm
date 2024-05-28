interface  UserInfo{
    name:string;
    clerk_id:string;
    fullName:string;
    username:string;
    email:string;
    password?:string;
    img_url?:string;
    lastName:string;
}
export const getUserInfo = async(userData:UserInfo)=>{
    try {
        const response = await fetch(`${process.env.SERVER_API_URL}/auth/`,{
            method:'POST',
            body:JSON.stringify(userData)
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }    
}