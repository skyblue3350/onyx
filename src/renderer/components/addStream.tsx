import * as React from 'react';
import { Modal, Button, Form, Input, Checkbox } from 'semantic-ui-react';

export interface Props {
    open: boolean
    onClose?: () => void
    onSubmit?: () => void
}

export interface State {
}

export default class AddStream extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
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
                                <Input label='Name' placeholder='All Issue' fluid/>
                            </Form.Field>
                            <Form.Field>
                                <Input label='Organization' placeholder='Select box' fluid/>
                            </Form.Field>
                            <Form.Field>
                                <Input label='Query' placeholder='is:issue' fluid/>
                            </Form.Field>
                            <Form.Field>
                                <Input label='Icon' placeholder='github' fluid icon='github'/>
                            </Form.Field>
                            <Form.Field>
                                <Input label='Color' placeholder='#afeeee' fluid/>
                            </Form.Field>
                            <Form.Field>
                                <Checkbox toggle label='Notification' />
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