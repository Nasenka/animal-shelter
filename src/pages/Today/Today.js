import { Button, Card, List, Modal, Typography } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { fetchTodayAnimals } from '../../actions/todayAnimals';

class Today extends React.PureComponent {
  static propTypes = {
    todayAnimals: PropTypes.arrayOf(
      PropTypes.shape({
        animal: PropTypes.shape({
          name: PropTypes.string,
          spec_name: PropTypes.string,
          spec_parent_name: PropTypes.string,
        }),
        drugs: PropTypes.arrayOf(
          PropTypes.shape({
            drug_dosage: PropTypes.number,
            drug_name: PropTypes.string,
            form_of_drug: PropTypes.string,
            usage_instruction: PropTypes.string,
          }),
        ),
        my_type: PropTypes.string,
      }),
    ).isRequired,
    fetchTodayAnimals: PropTypes.func.isRequired,
  };

  state = { animalIndex: null };

  componentDidMount() {
    const { fetchTodayAnimals } = this.props;

    fetchTodayAnimals();
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

  renderAnimal = (item, index) => {
    return (
      <List.Item>
        <Card
          title={
            <Button type="link" onClick={() => this.showModal(index)}>
              {item.animal.name}
            </Button>
          }
        >
          {item.my_type}
        </Card>
      </List.Item>
    );
  };

  renderAnimalDetail() {
    const { animalIndex } = this.state;
    const { todayAnimals } = this.props;
    const { Title } = Typography;

    if (animalIndex !== null) {
      const drugList = todayAnimals[animalIndex].drugs.map((drug, index) => (
        <li key={index}>
          {drug.drug_name} <br />
          Количество: {drug.drug_dosage}
          {drug.form_of_drug} <br />({drug.usage_instruction})
        </li>
      ));

      return (
        <>
          <p>Кличка: {todayAnimals[animalIndex].animal.name}</p>
          <p>Тип: {todayAnimals[animalIndex].animal.spec_parent_name}</p>
          <p>Подтип: {todayAnimals[animalIndex].animal.spec_name}</p>
          <p>Назначение: {todayAnimals[animalIndex].my_type}</p>
          {todayAnimals[animalIndex].drugs.length > 0 ? (
            <Title level={5}>Лекарства</Title>
          ) : null}
          <ol>{drugList}</ol>
        </>
      );
    }

    return null;
  }

  render() {
    const { animalIndex } = this.state;
    const { todayAnimals } = this.props;
    const { Title } = Typography;

    return (
      <>
        <Title>Назначения на сегодня</Title>
        <List
          dataSource={todayAnimals}
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
    todayAnimals: state.todayAnimals,
  };
};

const mapDispatchToProps = {
  fetchTodayAnimals,
};

export default connect(mapStateToProps, mapDispatchToProps)(Today);
