import * as React from 'react';
import { Menu, Icon, Sidebar, Segment, Popup, Button } from 'semantic-ui-react';

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
                <Sidebar.Pushable as={Segment}>
                    <Sidebar
                        as={Menu}
                        visible={true}
                        // compact={true}
                        vertical
                        // inverted
                        icon={!this.state.expand}
                        width={this.state.expand? 'thin': 'very thin'}
                        style={{display: 'flex', height: '100%'}}
                        >
                        {[1, 2, 3].map(i => {
                            const item = (
                                <Menu.Item as='a'>
                                    <div>
                                        <Icon name='users'/>
                                        {this.state.expand? 'Sample': null}
                                    </div>
                                </Menu.Item>
                            )

                            return (
                                <Popup
                                    trigger={item}
                                    content={'item: ' + i}
                                    position='left center'
                                    positionFixed
                                    style={{left: 80}}
                                />
                            )
                        })}


                        <div style={{margin: 0, marginTop: 'auto'}}>
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
                        
                    </Sidebar>
                

                    <Sidebar.Pusher>
                        <Segment basic>
                            <Icon name='angle double right' size='large'/>
                            {this.state.expand? 'Expand': null}

                            <Popup
                                trigger={<Icon name='angle double right' size='large'/>}
                                content={2 + 'aaaaaaaaaa'}
                                offset='0, 20px'
                                position='right center'
                                positionFixed
                            />

                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </>
        )
    }
}