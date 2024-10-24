export default class User {
    constructor()
    {
        this.username = null;
        this.password = null;
        this.role = null;
        this.branchId = null;
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

        this.branchId = branchID;
        
        return this;
        
    }

}