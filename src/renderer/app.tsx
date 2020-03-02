import * as React from 'react';
import { Menu, Icon, Sidebar, Segment, Popup, Button, List, Dropdown } from 'semantic-ui-react';
import { SortablePane, Pane } from 'react-sortable-pane';

export interface Props {
}

export interface State {
    expand: boolean
    streams: any
    order: number[]
}

export default class App extends React.Component<Props, State> {
    streamsRef: React.RefObject<HTMLDivElement>

    constructor(props: Props) {
        super(props)

        this.state = {
            expand: true,
            streams: [{v: 'a123'}, {v: 'b123'}, {v: 'c123'}, {v: 'd123'}],
            order: [0, 1, 2, 3],
        }

        this.streamsRef = React.createRef()
    }

    onResize(order: string[]) {
        console.log(order)
        this.setState({ order: order.map(Number) });
    }

    onClick(key: string) {
        const index = this.state.order.findIndex(item => item == parseInt(key))
        this.streamsRef.current!.scrollLeft = index * 300
    }

    render(): JSX.Element {
        return (
            <>
                <div style={{display: 'flex', userSelect: 'none'}}>
                    <Menu vertical style={{display: 'flex', minWidth: this.state.expand? 150: 50, maxWidth: this.state.expand? 150: 50, height: '100vh'}}>
                        <SortablePane
                            direction="vertical"
                            onOrderChange={this.onResize.bind(this)}
                            style={{flexGrow: 1, overflowX: 'hidden', overflowY: 'auto'}}>
                        {Object.keys(this.state.order).map((key) => {
                            const item = (
                                <Menu.Item as='a'>
                                    <div>
                                        <Icon name='users'/>
                                        {this.state.expand? `Stream${key}`: null}
                                    </div>
                                </Menu.Item>
                            )

                            return (
                                <Pane
                                    key={key}
                                    defaultSize={{width: '100%'}}
                                    resizable={{x: false, y: false, xy: false}}
                                    onClick={this.onClick.bind(this, key)}>
                                    <Popup
                                        trigger={item}
                                        content={'Stream: ' + this.state.streams[key].v}
                                        position='left center'
                                        positionFixed
                                        style={{left: 120}}
                                    />
                                </Pane>
                            )
                        })}
                        </SortablePane>
                        <div style={{}}>
                            <Menu.Item
                                as='a'
                                onClick={(event, data) => this.setState({expand: !this.state.expand})}>
                                <div>
                                    <Icon name='angle double right'/>
                                    {this.state.expand? 'Expand': null}
                                </div>
                            </Menu.Item>
                            <Dropdown icon={null} trigger={<div><Icon name='add'/>{this.state.expand? 'Add Item': null}</div>} className='link item'>
                                <Dropdown.Menu>
                                    <Dropdown.Item>Add Github Organization</Dropdown.Item>
                                    <Dropdown.Item>Add Stream</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Menu>
                

                    <div style={{display: 'flex', overflowX: 'auto', scrollBehavior: 'smooth'}} ref={this.streamsRef}>
                        {this.state.order.map((key, index) => {
                            return (
                                <div
                                    key={index}
                                    style={{minWidth: 300, width: 300, height: '100vh', margin: 0, padding: 2, display: 'flex', flexDirection: 'column'}}>
                                    <Segment inverted style={{alignItems: 'center', display: 'flex'}}>
                                        <div style={{flexGrow: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>Streaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaam {key}</div>
                                        <Button icon size='mini'>
                                            <Icon name='exchange' />
                                        </Button>
                                    </Segment>
                                    <List style={{flex: 1, overflowY: 'auto', marginTop: 0}}>
                                        {[...Array(30)].map((e, i) => {
                                            return <List.Item key={i} style={{height: 100}}>{this.state.streams[key].v}</List.Item>
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