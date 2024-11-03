export default class Branch{

    constructor(){
        this.id = null;
        this.name = null;
        this.adress = null;
        this.isOpen = null;
        this.users = [];
    }

    setId(id){
        this.id = id;
        return this;
    }

    getId(){
        return this.id;
    }

    setName(name){
        this.name = name;
        return this;
    }

    getName(){
        return this.name;
    }

    setAdress(adress){
        this.adress = adress;
        return this;
    }

    getAdress(){
        return this.adress;
    }

    getIsOpen()
    {
        return this.isOpen;
    }

    setIsOpen(isOpen){

        this.isOpen = isOpen;
        return this;
    }

    getUsers(){
        
        return this.users;
    }

    setUsers(employeeNumber){
        
        this.users = employeeNumber;
        return this;
    }
}