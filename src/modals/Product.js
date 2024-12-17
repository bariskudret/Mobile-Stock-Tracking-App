export default class products{

    constructor(){

        this.name = null;
        this.price = null;
        this.description = null;
        this.stockQuantity = null;
        this.category = null; //category_id
        this.updateAt = null;
        this.createdAt = null;
    }

    setUpdateAt(){
        this.updateAt = new Date().toISOString();
        return this;
    }
    setCreateAt(){

        this.createdAt = new Date().toISOString();
        return this;
    }

    getName(){
        return this.name;
    }

    setName(name){
        this.name = name;
        return this; // zincirleme çağır için
    }

    getDescription(){
        return this.description;
    }

    setDescription(description){
        this.description = description;
        return this;
    }

    getPrice(){
        return this.price;
    }

    setPrice(price){
        this.price = price;
        return this;
    }

    getStockQuantity() {
        return this.stockQuantity;
    }

    setStockQuantity(stockQuantity) {
        this.stockQuantity = stockQuantity;
        return this;
    }

    getCategory() {
        return this.category;
    }

    setCategory(category) {
        this.category = category;
        return this;
    }

}