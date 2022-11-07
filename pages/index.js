import React, { Component } from "react";
import { Card, Button, Header, Segment, Icon, Message} from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
// import emptyState from "../components/emptyState.svg"; // need public folder to show in localhost
// import emptyState from "../emptyState.svg"; // or https://imgur.com/sb8PMs9
import { Link } from "../routes";

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
    
  }
  renderCampaigns() {
    if (this.props.campaigns.length !== 0) {
      const items = this.props.campaigns.map((address) => {
        return {
          header: address,
          description: (
            <Link route={`/campaigns/${address}`}>
              <a>View Campaign</a>
            </Link>
          ),
          fluid: true,
        };
      });
      return <div>     
        <Link route="/campaigns/new" >
          <a>
            <Button animated color = "teal" floated="right">
              <Button.Content visible
                              content="Create Campaign"/>
            <Button.Content hidden>
              <Icon name='arrow right' />
            </Button.Content> 
            </Button>
          </a>
        </Link>
          <Header as='h3' attached='top' >
              List of Open Campaigns
          </Header>
          <Segment attached>
            <Card.Group items={items} />
          </Segment> 
      </div>
      ;
    } else {
      return <div>
            <Header as='h3' icon textAlign='center'>
          <Icon name='wizard' />
          You are the first campaigner!
            </Header>        
        <Link route="/campaigns/new" >
          <a>
          <Segment basic textAlign={"center"}>
            <Button animated color = "teal">
              <Button.Content visible
                              floated="center"
                              content="Create Campaign"/>
            <Button.Content hidden>
              <Icon name='arrow right' />
                </Button.Content>
                
              </Button>
              </Segment>
            </a>
          </Link>
        </div>
    }
    
  }

  render() {
    return (
      <div>
        <Layout>
        <div style={{ marginTop: "20px"}}>
          <Message color='teal'>
          <Message.Header>Start your campaign at Foundly</Message.Header>
          <p>
            Foundly is a crowd-founding service that achieves transparency in the flow of donated money through employing a decentralized system of web3.0.                    
            You can propose campaigns to raise funds AND/OR upvote for campaigns which interest you. 
          </p>
            </Message>
            </div>
          <div style={{ marginTop: "50px"}}>
              {this.renderCampaigns()}
          </div>
        </Layout>
      </div>
      
    );
  }
}

export default CampaignIndex;
