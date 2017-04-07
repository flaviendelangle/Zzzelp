var ZzzelpFloodsAttack = function(value, full_army, manual) {
	this.setValue(value);
	this.setFullArmy(full_army);
	this.setManual(manual);
	
};

ZzzelpFloodsAttack.prototype.getValue = function() {
	return this.value;
};

ZzzelpFloodsAttack.prototype.setValue = function(newValue) {
	this.value = newValue;
};

ZzzelpFloodsAttack.prototype.isFullArmy = function() {
	return this.full_army;
};

ZzzelpFloodsAttack.prototype.setFullArmy = function(newFullArmy) {
	this.full_army = newFullArmy;
};

ZzzelpFloodsAttack.prototype.isManual = function() {
	return this.manual;
};

ZzzelpFloodsAttack.prototype.setManual = function(newManual) {
	this.manual = newManual;
};