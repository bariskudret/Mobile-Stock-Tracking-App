export default class User {
    constructor()
    {
        this.username = null;
        this.password = null;
        this.role = null;
        this.branch = null;
        this.email = null;
    }

    getUsername()
    {
        return this.username;
    }

    setUsername(username)
    {
        this.username = username;

        return this;
    }

    getPassword()
    {
        return btoa(this.password);
    }

    setPassword(password)
    {
        this.password = password;

        return this;
    }

    getBranch(){

        return this.branchId;

    }

    setBranch(branchID){

        this.branch = branchID;
        
        return this;
        
    }

    getEmail(){
        
        return this.email;
    }

    setEmail(email){

        this.email = email;
        return this;
    }

}