/**
 * Item that holds all info of redcored item, including name, quantity, expiration, tags and reminder period
 */
export default class Item {

  constructor({_id, _name, _quantity = 1, _expiration, _tags, _period} = {}){
    this.id = _id;
    this.name = _name;
    this.quantity = _quantity;
    this.expiration = _expiration;
    this.tags = _tags;
    this.period = _period;
  }
  show() {
    console.log(`Item id:${this.id} name:${this.name} qty:${this.quantity} exp:${this.expiration} tags:${this.tags} period:${this.period}`);
  }
}