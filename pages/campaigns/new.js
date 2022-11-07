import React, { Component } from "react";
import { Form, Button, Input, Message, Header} from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

class CampaignNew extends Component {
  state = {
    minimumContribution: "",
    errorMessage: "",
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0],
        });

      Router.pushRoute("/");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <Header as='h3' color='teal'>
        Create a New Campaign
            </Header>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} style={{ marginTop: "30px"}}>
          <Form.Field required>
            <label>Minimum Contribution</label>
            <p>
              Decide on the minimum contribution required by each donor. 
              (Minimum: 1 wei)
            </p>
            <Input
              style={{ width: "150px"}}
              label={{ basic: true, content: 'wei' }}
              labelPosition="right"
              placeholder='type in the value'
              value={this.state.minimumContribution}
              onChange={(event) =>
                this.setState({ minimumContribution: event.target.value })
              }
            />
             <Button loading={this.state.loading} color='teal' floated='right'>
            Create!
          </Button>
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
