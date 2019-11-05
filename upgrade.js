export default class Upgrade {
    constructor(name, cost, maxPurchases, unlockIQ, type) {
        this.name = name;
        this.cost = cost;
        this.costIncrementer = function (cost) {return cost * 1.1};
        this.count = 0;
        this.maxPurchases = maxPurchases;
        this.unlockIQ = unlockIQ;
        this.type = type;
        this.multiplier = 1;
        this.increase = function (count) {return count};
        this.image = "";
        this.info = "";
        this.description = "";
    }

    setName(name) {this.name = name};
    setCost(cost) {this.cost = cost};
    setCount(count) {this.count = count};
    setMaxPurchases(maxPurchases) {this.maxPurchases = maxPurchases};
    setUnlockIQ(unlockIQ) {this.unlockIQ = unlockIQ};
    setCostIncrementer(costIncrementer) {this.costIncrementer = costIncrementer};
    setMultiplier(multiplier) {this.multipler = multiplier};
    setIncrease(increase) {this.increase = increase};
    setDescription(description) {this.description = description};
    setInfo(info) {this.info = info};
    setType(type) {
        switch(type) {
            case 'TICK': 
                this.type = 'TICK';
            case 'CLICK':
                this.type = 'CLICK';
            case 'TICK_PER':
                this.type = 'TICK_PER';
            case 'CLICK_PER':
                this.type = 'CLICK_PER';
            case 'TICK_MULT':
                this.type = 'TICK_MULT';
            case 'CLICK_MULT':
                this.type = 'CLICK_MULT';
            case 'ALL_MULT':
                this.type = 'ALL_MULT';
            case 'All_PER':
                this.type = 'ALL_PER';
        }
    }
    setImage(image) {this.image = image};

    getName() {return this.name};
    getCost() {return this.cost};
    getCount() {return this.count};
    getUnlockIQ() {return this.unlockIQ};
    getType() {return this.type};
    getDescription() {return this.description;}

    increaseCount() {
        if (this.count <= this.maxPurchases) {
            this.count += 1;
            this.cost = this.costIncrementer(this.cost);
        }
    }

    increment() {
        let a = this.multiplier * this.increase(this.count);
        return a;
    }

}

//HELLO ITS ME