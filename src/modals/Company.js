export default class Company {
    constructor() {
        this.id = null;
        this.name = null;
        this.branches = [];
    }

    setId(id) {
        this.id = id;
        return this;
    }

    getId() {
        return this.id;
    }

    setName(name) {
        this.name = name;
        return this;
    }

    getName() {
        return this.name;
    }

    setBranches(branches) {
        this.branches = branches;
        return this;
    }

    getBranches() {
        return this.branches;
    }
}