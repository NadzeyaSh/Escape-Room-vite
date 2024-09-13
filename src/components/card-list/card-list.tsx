import { CardProps } from '../../types/types';
import Card from '../card/card';

type MainScreenProps = {
    dataQuests: CardProps[] | undefined;
  }

function CardList({dataQuests}:MainScreenProps):JSX.Element {
  return (
    <div className="cards-grid">
      {dataQuests && dataQuests.map((item) => <Card key={item.id} data={item} />)}
    </div>
  );
}

export default CardList;
