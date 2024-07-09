import { Component } from 'react';
import './CharacterCard.css';

export type CharacterCardProps = {
  name: string;
  // species_name: string;
  gender: string;
  birth_year: string;
  eye_color: string;
  hair_color: string;
  height: number;
};

class CharacterCard extends Component<CharacterCardProps> {
  render() {
    return (
      <div className='character-card'>
        <h3>{this.props.name}</h3>
        {this.props.gender}, born {this.props.birth_year}, eyes: {this.props.eye_color}, hair: {this.props.hair_color},
        height: {this.props.height}.
      </div>
    );
  }
}

export default CharacterCard;
