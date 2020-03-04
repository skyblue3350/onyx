import * as React from 'react';
import { Modal, Button, Form, Input } from 'semantic-ui-react';

export interface Props {
    open: boolean
    onClose?: () => void
    onSubmit?: () => void
}

export interface State {
}

export default class AddOrganization extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
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
                                <Input label='Github API' placeholder='api.github.com' fluid/>
                            </Form.Field>
                            <Form.Field>
                                <Input label='Access Token' placeholder='your access token' fluid/>
                            </Form.Field>
                            <Form.Field>
                                <Input label='API Interval' placeholder='10' fluid/>
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.props.onClose} negative content='Cancel' />
                        <Button onClick={this.props.onSubmit} positive content='OK' />
                    </Modal.Actions>

                </Modal>)
    }
}