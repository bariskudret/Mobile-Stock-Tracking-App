export default class Category
{
    constructor(){

        this.name = null;
        this.id = null;
        this.description = null;


    }

    getId(){
        return this.id;
    }

    getName(){
        return this.name;
    }

    getDescription(){
        return this.description;
    }

    setName(name)
    {
        this.name = name;
        return this;
    }

    setId(id){
        this.id = id;
        return this;
    }

    setDescription(description){
        this.description = description;

        return this;
    }

}