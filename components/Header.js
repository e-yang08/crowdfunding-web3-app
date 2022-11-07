import React from "react";
import { Header, Icon} from "semantic-ui-react";
import { Link } from "../routes";

const Header1 = () => {
  return (
    <div>
      <Header as='h2' style={ { marginTop: "20px" } }>
        <Link exact route="/">
          <p>
            <Icon name='handshake' />
            <Header.Content>Foundly</Header.Content>
          </p>
        </Link>
      </Header>
    </div>

  );
};

export default Header1;
