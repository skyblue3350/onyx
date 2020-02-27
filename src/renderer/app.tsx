import * as React from 'react';
import { Menu, Icon, Sidebar, Segment, Popup, Button, List } from 'semantic-ui-react';

export interface Props {
}

export interface State {
    expand: boolean
}

export default class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            expand: true,
        }
    }

    render(): JSX.Element {
        return (
            <>
                <div style={{display: 'flex'}}>
                    <Menu vertical style={{display: 'flex', minWidth: this.state.expand? 150: 50, maxWidth: this.state.expand? 150: 50, height: '100vh'}}>
                        <div style={{flexGrow: 1, overflowY: 'auto'}}>
                        {[...Array(10)].map((e, i) => {
                            const item = (
                                <Menu.Item as='a'>
                                    <div>
                                        <Icon name='users'/>
                                        {this.state.expand? `Sample${i}`: null}
                                    </div>
                                </Menu.Item>
                            )

                            return (
                                <Popup
                                    key={i}
                                    trigger={item}
                                    content={'item: ' + i}
                                    position='left center'
                                    positionFixed
                                    style={{left: 80}}
                                />
                            )
                        })}
                        </div>
                        <div style={{}}>
                            <Menu.Item
                                as='a'
                                onClick={(event, data) => this.setState({expand: !this.state.expand})}>
                                <div>
                                    <Icon name='angle double right'/>
                                    {this.state.expand? 'Expand': null}
                                </div>
                            </Menu.Item>
                            <Menu.Item as='a'>
                                <div>
                                    <Icon name='add'/>
                                    {this.state.expand? 'Add Stream': null}
                                </div>
                            </Menu.Item>
                        </div>
                    </Menu>
                

                    <div style={{display: 'flex', overflowX: 'auto'}}>
                        {[1, 2, 3].map(i => {
                            return (
                                <div key={i} style={{minWidth: 300, width: 300, height: '100vh', margin: 0, padding: 2, display: 'flex', flexDirection: 'column'}}>
                                    <Segment inverted>
                                        Stream Title
                                        <Button icon floated='right' size='mini'>
                                            <Icon name='exchange' />
                                        </Button>
                                    </Segment>
                                    <List style={{flex: 1, overflowY: 'auto', marginTop: 0}}>
                                        {[...Array(30)].map((e, i) => {
                                            return <List.Item key={i}>a</List.Item>
                                        })}
                                   </List>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </>
        )
    }
}