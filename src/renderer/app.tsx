import * as React from 'react';
import { Menu, Icon, Sidebar, Segment, Popup, Button, List, Dropdown, SemanticICONS } from 'semantic-ui-react';
import { SortablePane, Pane } from 'react-sortable-pane';
import { ipcRenderer } from 'electron';
import Store from 'electron-store'
import AddOrganization from './components/addOrganization';
import AddStream from './components/addStream';
import { Organization, Stream } from '../types/config';
import { SemanticCOLORS } from 'semantic-ui-react/dist/commonjs/generic';

export interface Props {
}

export interface State {
    expand: boolean
    order: string[]
    modal: {
        organization: boolean
        stream: boolean
    }
    configs: {
        organizations: Organization[]
        streams: Stream[]
    }
}

export default class App extends React.Component<Props, State> {
    streamsRef: React.RefObject<HTMLDivElement>
    private store: Store<any>

    constructor(props: Props) {
        super(props)
        this.store = new Store()

        this.state = {
            expand: this.store.get('expand', true),
            order: this.store.get('order', [...(this.store.get('streams', []).keys())]),
            modal: {
                organization: false,
                stream: false,
            },
            configs: {
                organizations: this.store.get('organizations', []),
                streams: this.store.get('streams', []),
            }
        }

        this.streamsRef = React.createRef()

        ipcRenderer.on("addOrganization", (_, data) => {
            this.setState({modal: {...this.state.modal, organization: true}})
        })
        ipcRenderer.on("addStream", (_, data) => {
            this.setState({modal: {...this.state.modal, stream: true}})
        })
    }

    addOrganization(org: Organization) {
        const organizations = this.store.get('organizations', []) as Organization[]
        organizations.push(org)
        this.store.set('organizations', organizations)
        this.setState({
            modal: {...this.state.modal, organization: false},
            configs: {...this.state.configs, organizations: organizations},
        })
    }

    addStream(stream: Stream) {
        const streams = this.store.get('streams', []) as Stream[]
        const i = streams.push(stream)
        this.store.set('streams', streams)
        this.setState({
            order: [...this.state.order, (i - 1).toString()],
            modal: {...this.state.modal, stream: false},
            configs: {...this.state.configs, streams: streams},
        })
    }

    onOrderChange(order: string[]) {
        this.setState({order})
        this.store.set('order', this.state.order)
    }

    onClick(key: string) {
        const index = this.state.order.findIndex(item => item == key)
        this.streamsRef.current!.scrollLeft = index * 300
    }

    onExpand(event: any, data: any) {
        ipcRenderer.send("resize", {expand: !this.state.expand})
        this.setState({expand: !this.state.expand})
    }

    render(): JSX.Element {
        return (
            <>
                <AddOrganization
                    open={this.state.modal.organization}
                    onSubmit={(data) => this.addOrganization(data)}
                    onClose={() => this.setState({modal: {...this.state.modal, organization: false}})} />
                <AddStream
                    open={this.state.modal.stream}
                    onSubmit={(data) => this.addStream(data)}
                    onClose={() => this.setState({modal: {...this.state.modal, stream: false}})} />
                <div style={{display: 'flex', userSelect: 'none'}}>
                    <Menu vertical style={{display: 'flex', minWidth: this.state.expand? 150: 50, maxWidth: this.state.expand? 150: 50, height: '100vh'}}>
                        <SortablePane
                            direction="vertical"
                            order={this.state.order}
                            onOrderChange={this.onOrderChange.bind(this)}
                            style={{flexGrow: 1, overflowX: 'hidden', overflowY: 'auto'}}>
                        {this.state.configs.streams.map((stream, index) => {
                            const item = (
                                <Menu.Item as='a'>
                                    <div>
                                        <Icon name={stream.icon as SemanticICONS} color={stream.color as SemanticCOLORS } />
                                        {this.state.expand? stream.name: null}
                                    </div>
                                </Menu.Item>
                            )

                            return (
                                <Pane
                                    key={index.toString()}
                                    defaultSize={{width: '100%'}}
                                    resizable={{x: false, y: false, xy: false}}
                                    onClick={() => this.onClick(index.toString())}
                                    style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>
                                    <Popup
                                        trigger={item}
                                        content={stream.name}
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
                                onClick={this.onExpand.bind(this)}>
                                <div>
                                    <Icon name={this.state.expand? 'angle double left': 'angle double right'}/>
                                    {this.state.expand? 'Collapase': null}
                                </div>
                            </Menu.Item>
                            <Dropdown icon={null} trigger={<div><Icon name='add'/>{this.state.expand? 'Add Item': null}</div>} className='link item'>
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        onClick={() => this.setState({modal: {...this.state.modal, organization: true}})}
                                        content="Add Github Organization" />
                                    <Dropdown.Item
                                        onClick={() => this.setState({modal: {...this.state.modal, stream: true}})}
                                        content='Add Stream' />
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Menu>
                

                    <div style={{display: 'flex', overflowX: 'auto', scrollBehavior: 'smooth'}} ref={this.streamsRef}>
                        {this.state.order.map((key, index) => {
                            const stream = this.state.configs.streams[Number(key)]

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
                                            return <List.Item key={i} style={{height: 100}}>{stream.name}</List.Item>
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