import { Button, Card, Divider, List, Modal, Typography } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { fetchAnimals } from '../../actions/animals';

class Animals extends React.PureComponent {
  static propTypes = {
    animals: PropTypes.arrayOf(
      PropTypes.shape({
        animal_attributes: PropTypes.arrayOf(
          PropTypes.shape({
            attr_id: PropTypes.number,
            name: PropTypes.string,
            value: PropTypes.string,
          }),
        ),
        birth_date: PropTypes.string,
        date_joined: PropTypes.string,
        death_date: PropTypes.string,
        death_reason: PropTypes.string,
        name: PropTypes.string,
        place_of_catch: PropTypes.string,
        spec_category_name: PropTypes.string,
        spec_name: PropTypes.string,
        spec_parent_name: PropTypes.string,
        status: PropTypes.string,
      }),
    ).isRequired,
    fetchAnimals: PropTypes.func.isRequired,
  };

  state = { animalIndex: null };

  componentDidMount() {
    const { fetchAnimals } = this.props;

    fetchAnimals();
  }

  showModal = index => {
    this.setState({
      animalIndex: index,
    });
  };

  handleCancel = () => {
    this.setState({
      animalIndex: null,
    });
  };

  formatDate = date => {
    const creationDate = new Date(date);

    return creationDate.toLocaleDateString('ru-Ru');
  };

  renderAnimal = (item, index) => {
    return (
      <List.Item>
        <Card
          title={
            <Button type="link" onClick={() => this.showModal(index)}>
              {item.name}
            </Button>
          }
        >
          <p>Тип животного: {item.spec_parent_name}</p>
          <p>Подтип (порода): {item.spec_name}</p>
        </Card>
      </List.Item>
    );
  };

  renderAnimalDetail() {
    const { animalIndex } = this.state;
    const { animals } = this.props;
    const animal = animals[animalIndex];
    const attributes = {
      height: 'Рост',
      weight: 'Вес',
      sex: 'Пол',
      color: 'Цвет',
    };

    if (animalIndex !== null) {
      const animalAttributes = animal.animal_attributes.map(attribute => (
        <div key={attribute.attr_id}>
          {attributes[attribute.name]}: {attribute.value}
        </div>
      ));

      return (
        <>
          <div>Кличка: {animal.name}</div>
          <div>Подтип: {animal.spec_name}</div>
          <div>Тип: {animal.spec_parent_name}</div>
          <Divider dashed />
          <div>Статус: {animal.status}</div>
          <div>Принят в приют: {this.formatDate(animal.date_joined)}</div>
          {animal.place_of_catch && (
            <div>Место отлова: {animal.place_of_catch}</div>
          )}
          <div>Категория животного: {animal.spec_category_name}</div>
          <Divider dashed />
          {animalAttributes}
          <Divider dashed />
          {animal.birth_date && (
            <div>Дата рождения: {this.formatDate(animal.birth_date)}</div>
          )}
          {animal.death_date && (
            <div>Дата смерти: {this.formatDate(animal.death_date)}</div>
          )}
          {animal.death_reason && (
            <div>Причина смерти: {animal.death_reason}</div>
          )}
        </>
      );
    }

    return null;
  }

  render() {
    const { animalIndex } = this.state;
    const { animals } = this.props;
    const { Title } = Typography;

    return (
      <>
        <Title>Все животные</Title>
        <List
          dataSource={animals}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 3,
            xxl: 3,
          }}
          renderItem={this.renderAnimal}
        />
        <Modal
          footer={null}
          title="Карточка животного"
          visible={animalIndex !== null}
          onCancel={this.handleCancel}
        >
          {this.renderAnimalDetail()}
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    animals: state.animals,
  };
};

const mapDispatchToProps = {
  fetchAnimals,
};

export default connect(mapStateToProps, mapDispatchToProps)(Animals);
