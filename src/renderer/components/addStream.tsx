import * as React from 'react';
import { Modal, Button, Form, Input, Checkbox, Select, Search, Dropdown, Icon } from 'semantic-ui-react';
// @ts-ignore
import { ICONS, COLORS } from 'semantic-ui-react/dist/commonjs/lib/SUI';

import { Stream, Organization } from '../../types/config';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';

export interface Props {
    open: boolean
    onClose?: () => void
    onSubmit?: (stream: Stream) => void
    organizations: Organization[]
}

export interface State extends Stream {
}

export default class AddStream extends React.Component<Props, State> {
    icons: []
    organizations: []
    colors: []

    constructor(props: Props) {
        super(props)

        this.state = {
            name: '',
            query: '',
            icon: 'code branch',
            color: '',
            notification: true,
            organizationName: '',
        }

        this.icons = ICONS.map((item: string) => {
            return {key: item, value: item, icon: item, text: item}
        })
        this.organizations = this.props.organizations.map((item) => {
            console.log(item)
            return {key: item.name, value: item.name, text: item.name}
        }) as []
        this.colors = COLORS.map((item: string) => {
            return {key: item, value: item, text: item}
        })
    }

    onSubmit() {
        if (this.props.onSubmit) this.props.onSubmit(this.state)
    }

    render(): JSX.Element {
        return (<Modal
                    open={this.props.open}
                    centered={false}
                    dimmer='blurring'
                >
                    <Modal.Header>Add Stream</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <Input value={this.state.name} onChange={(e, data) => this.setState({name: data.value})} label='Name' placeholder='All Issue' fluid/>
                            </Form.Field>
                            <Form.Field>
                                <div className="ui fluid labeled input">
                                    <div className="ui label label">Organization</div>
                                    <Dropdown placeholder='Select Your organization' lazyLoad onChange={(event, data) => this.setState({organizationName: data.value!.toString()})} search selection fluid options={this.organizations} />
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <Input value={this.state.query} onChange={(e, data) => this.setState({query: data.value})} label='Query' placeholder='is:issue' fluid/>
                            </Form.Field>
                            <Form.Field>
                                <div className="ui fluid labeled input">
                                    <div className="ui label label">Icon</div>
                                    <Dropdown placeholder={this.state.icon} lazyLoad onChange={(event, data) => this.setState({icon: data.value!.toString()})} search selection fluid options={this.icons} icon={this.state.icon === ''? 'dropdown': {name: this.state.icon, style: {float: 'right'}}} />
                                </div>
                                
                            </Form.Field>
                            <Form.Field>
                                <div className="ui fluid labeled input">
                                    <div className="ui label label">Color</div>
                                    <Dropdown onChange={(event, data) => this.setState({color: data.value!.toString()})} search selection fluid options={this.colors} />
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <Checkbox checked={this.state.notification} onChange={(e, data) => this.setState({notification: data.checked!})} toggle label='Notification' />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.props.onClose} negative content='Cancel' />
                        <Button onClick={() => this.onSubmit()} positive content='OK' />
                    </Modal.Actions>

                </Modal>)
    }
}