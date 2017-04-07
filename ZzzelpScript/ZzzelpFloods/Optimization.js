var ZzzelpFloodsOptimization = function(TDC_attaquant, TDC_cible, capacity, full_army_mode, margin) {

    this.setTDCAttaquant(TDC_attaquant);
    this.setTDCCible(TDC_cible);
    this.setCapacity(capacity);
    this.setMargin(margin);
    this.setFullArmyMode(full_army_mode);
    this.floods = {};
    this.saveParameters();
    this.main();

};

ZzzelpFloodsOptimization.prototype.get = function(k) {
    return this.floods[k];
};

ZzzelpFloodsOptimization.prototype.getFloods = function() {
    return this.floods;
};

ZzzelpFloodsOptimization.prototype.getTDCAttaquant = function() {
    return this.TDC_attaquant;
};

ZzzelpFloodsOptimization.prototype.setTDCAttaquant = function(newTDCAttaquant) {
    this.TDC_attaquant = newTDCAttaquant;
};

ZzzelpFloodsOptimization.prototype.increaseTDCAttaquant = function(taking) {
    this.TDC_attaquant += taking;
};

ZzzelpFloodsOptimization.prototype.getTDCCible = function() {
    return this.TDC_cible;
};

ZzzelpFloodsOptimization.prototype.setTDCCible = function(newTDCCible) {
    this.TDC_cible = newTDCCible;
};

ZzzelpFloodsOptimization.prototype.decreaseTDCCible = function(taking) {
    this.TDC_cible -= taking;
};

ZzzelpFloodsOptimization.prototype.getCapacity = function() {
    return this.capacity;
};

ZzzelpFloodsOptimization.prototype.setCapacity = function(newCapacity) {
    this.capacity = newCapacity;
};

ZzzelpFloodsOptimization.prototype.decreaseCapacity = function(taking) {
    this.capacity -= taking;
};

ZzzelpFloodsOptimization.prototype.getMargin = function() {
    return this.margin;
};

ZzzelpFloodsOptimization.prototype.setMargin = function(newMargin) {
    this.margin = newMargin;
};

ZzzelpFloodsOptimization.prototype.decreaseMargin = function(taking) {
    this.margin -= taking;
};

ZzzelpFloodsOptimization.prototype.setFullArmyMode = function(newFullArmyMode) {
    this.full_army_mode = newFullArmyMode;
};

ZzzelpFloodsOptimization.prototype.getFullArmyMode = function() {
    return this.full_army_mode;
};

ZzzelpFloodsOptimization.prototype.isEmpty = function() {
    return (this.getLength() === 0);
};

ZzzelpFloodsOptimization.prototype.getLength = function() {
    var length = 0;
    for(var el in this.getFloods()) {
        length++;
    }
    return length;
};

ZzzelpFloodsOptimization.prototype.saveParameters = function() {
    this.backup = {
        TDC_attaquant : this.getTDCAttaquant(),
        TDC_cible : this.getTDCCible(),
        full_army_mode : this.getFullArmyMode(),
    };
};

ZzzelpFloodsOptimization.prototype.main = function() {
    if(this.getTDCAttaquant() <= 2*this.getTDCCible() && this.getTDCCible() <= this.getTDCAttaquant()*3) {
        if (this.getMargin() == -1) {
            this.computeWithoutMargin();
        }
        else if (this.getMargin() > 0) {
            this.computeWithMargin();
        }
    }
};

ZzzelpFloodsOptimization.prototype.computeWithoutMargin = function() {
    while (this.getTDCAttaquant() < Math.floor(this.getTDCCible()*1.4) && this.getCapacity() >= this.getTDCCible()*0.2) {
        if(this.isEmpty() && this.getFullArmyMode() == 'armee_debut') {
            this.add(-2);
        }
        else {
            this.add(Math.floor(this.getTDCCible() * 0.2));
        }
    }
    this.setMargin(Math.floor((this.getTDCCible()*2 - this.getTDCAttaquant())/3));
    if (this.getCapacity() >= this.getMargin()) {
        if(this.isEmpty() && this.getFullArmyMode() == 'armee_debut') {
            this.add(-2);
        }
        else {
            this.add(this.getMargin());
            if(this.getFullArmyMode() == 'armee_fin') {
                this.add(-2);
            }
            else if (this.getCapacity() >= this.getTDCCible()*0.2) {
                this.add(Math.floor(this.getTDCCible() * 0.2));
            }
            else {
                this.add(this.getCapacity());
            }
        }
    }
    else if (this.getCapacity() > 0) {
        this.add(this.getCapacity());
    }
};

ZzzelpFloodsOptimization.prototype.computeWithMargin = function() {
    while (this.getMargin() > this.getTDCCible()*0.2 && this.getTDCAttaquant() < Math.floor(this.getTDCCible()*1.4) && this.getCapacity() >= this.getTDCCible()*0.2) {
        this.add(Math.floor(this.getTDCCible() * 0.2));
    }
    if (this.getMargin() > this.getTDCCible()*0.36) {
        this.fix();
    }
    else if (this.getMargin() <= this.getTDCCible()*0.2 && this.getCapacity() >= this.getMargin()) {
        this.add(this.getMargin());
    }
    else if (this.getMargin() > this.getTDCCible()*0.2 && this.getCapacity() >= this.getMargin()) {
        marge_2 = Math.floor((this.getTDCCible()*2-this.getTDCAttaquant())/3);
        this.add(marge_2);
        this.add(this.getMargin());
    }
    else if (this.getCapacity() > 0) {
        this.add(this.getCapacity());
    }
};

ZzzelpFloodsOptimization.prototype.fix = function() {
    var b = this.backup,
        temp = ZzzelpFloodsOptimization(b.TDC_attaquant, b.TDC_cible, b.capacity, b.full_army_mode, -1);
    for(var el in temp) {
        this[el] = temp[el];
    }
};

ZzzelpFloodsOptimization.prototype.add = function(value) {
    var full_army = false;
    if(value == -2) {
        full_army = true;
        value = Math.floor(this.getTDCCible() * 0.2);
    }
    this.decreaseTDCCible(value);
    this.increaseTDCAttaquant(value);
    this.decreaseCapacity(value);
    this.decreaseMargin(value);
    this.floods[this.getLength()] = new ZzzelpFloodsAttack(value, full_army, false);
};

ZzzelpFloodsOptimization.create = function(floods) {
    var optimisation = new ZzzelpFloodsOptimization(0, 1);
    for(var element in floods) {
        var flood = floods[element];
        optimisation.floods[element] = new ZzzelpFloodsAttack(flood.value, flood.full_army, flood.manual);
    }
    return optimisation;
};