export default class BranchProduct{

    constructor(){

        this.branch = null; // brnachId
        this.stockQuantitiy = null;
        this.price = null;
        this.product = null; // productId

    }

    getBranchId(){

        return this.branch;
    }
    setBranchId(branchId){

        this.branch = branchId;
        return this;
    }

    getStockQantitiy(){

        return this.stockQuantitiy;
    }

    setStockQuantitiy(stockQuantitiy){
    
        this.stockQuantitiy = stockQuantitiy;
        return this;
    }

    getPrice(){

        return this.price;
    }

    setPrice(price){

        this.price = price;
        return this;
    }

    getProductId(){
        return this.product;
    }

    setProductId(productId){
        this.product = productId;
        return this;
    }


}