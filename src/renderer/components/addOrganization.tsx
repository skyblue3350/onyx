import * as React from 'react';
import { Modal, Button, Form, Input } from 'semantic-ui-react';
import { Organization } from '../../types/config';

export interface Props {
    open: boolean
    onClose?: () => void
    onSubmit?: (org: Organization) => void
}

export interface State extends Organization {
}

export default class AddOrganization extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            name: '',
            api: '',
            accessToken: '',
            interval: 3,
        }
    }

    onSubmit() {
        console.log(this.state)
        if (this.props.onSubmit) this.props.onSubmit(this.state)
    }

    render(): JSX.Element {
        return (<Modal
                    open={this.props.open}
                    centered={false}
                    dimmer='blurring'
                >
                    <Modal.Header>Add Your Github Organization</Modal.Header>
                    <Modal.Content>
                        <Form>
                        <Form.Field>
                                <Input value={this.state.name} onChange={(e, data) => this.setState({name: data.value})} label='Name' placeholder='All Issue' fluid/>
                            </Form.Field>
                            <Form.Field>
                                <Input value={this.state.api} onChange={(e, data) => this.setState({api: data.value})} label='Github API' placeholder='api.github.com' fluid/>
                            </Form.Field>
                            <Form.Field>
                                <Input value={this.state.accessToken} onChange={(e, data) => this.setState({accessToken: data.value})} label='Access Token' placeholder='your access token' fluid/>
                            </Form.Field>
                            <Form.Field>
                                <Input value={this.state.interval} onChange={(e, data) => this.setState({interval: parseInt(data.value)})} label='API Interval' placeholder='10' fluid/>
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