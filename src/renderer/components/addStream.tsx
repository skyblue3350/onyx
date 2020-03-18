import * as React from 'react';
import { Modal, Button, Form, Input, Checkbox, Select } from 'semantic-ui-react';
import { Stream } from '../../types/config';

export interface Props {
    open: boolean
    onClose?: () => void
    onSubmit?: (stream: Stream) => void
}

export interface State extends Stream {
}

export default class AddStream extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            name: '',
            query: '',
            icon: '',
            color: '',
            notification: true,
            organizationName: '',
        }
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
                                    <Select placeholder='Select Your organization' options={[]} fluid />
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <Input value={this.state.query} onChange={(e, data) => this.setState({query: data.value})} label='Query' placeholder='is:issue' fluid/>
                            </Form.Field>
                            <Form.Field>
                                <Input value={this.state.icon} onChange={(e, data) => this.setState({icon: data.value})} label='Icon' placeholder='github' fluid icon='github'/>
                            </Form.Field>
                            <Form.Field>
                                <Input value={this.state.color} onChange={(e, data) => this.setState({color: data.value})} label='Color' placeholder='#afeeee' fluid/>
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