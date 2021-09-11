export default class PlantList extends Component {
  constructor() {
    super();
    this.state = {
      plants: [],
    };
    fetch(`https://http://localhost:3333/plants`)
      .then(res => res, json());
  };
    componentDidMount() {
      this.setState({ plants: plantsData })
    };
};
/*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
render() {
  return (
    <main className="plant-list">
      {this.state?.plants?.map((plant) => (
        <div className="plant-card" key={plant.id}>
          <img className="plant-image" src={plant.img} alt={plant.name} />
          <div className="plant-details">
            <h2 className="plant-name">{plant.name}</h2>
            <p className="plant-scientific-name">{plant.scientificName}</p>
            <p>{plant.description}</p>
            <div className="plant-bottom-row">
              <p>${plant.price}</p>
              <p>:sunny: {plant.light}</p>
              <p>:sweat_drops: {plant.watering}x/month</p>
            </div>
            <button
              className="plant-button"
              onClick={() => this.props.addToCart(plant)}
            >
              Add to cart
              </button>
          </div>
        </div>
      ))}
    </main>
  );
}
}