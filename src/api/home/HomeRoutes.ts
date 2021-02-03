
import RouterClass from '../../routes/RouterClass'
export default class HomeRoutes extends RouterClass{
  books:Object;
    constructor(){
      super();
      this.routes()
      this.books = [
        { id: 101, name: "Clube da koa", author: "Chuck Paanine" },
        { id: 102, name: "Ta isso ai", author: "Gillian Flynn" },
        { id: 103, name: "Frankenstein", author: "Mary Shelley" },
        { id: 101, name: "Into The Wild", author: "John Krakauer" },
      ];
    }
    routes(){
      return this.app.get("/", (req, res) => {
       res.send(`It's a live =  ${this.books}`);
      })
      }
}

