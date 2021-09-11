import React from 'react'


class PokemonIndex extends React.Component{

    constructor(props){
        super(props)
        this.state ={

        }
    }
    componentDidMount(){
        this.props.requestAllPokemon();
    }

    render(){
        const { pokemon } = this.props
        const lisOfPoke = pokemon.map( (poke,idx) => {
            return (
                <li key={idx}>
                    <img src={poke.image_url} className="small"></img>
                    {poke.name}
                 </li>
             )
        })
        return(
            <ul>
                {lisOfPoke}
            </ul>

        );
    }

}

export default PokemonIndex;