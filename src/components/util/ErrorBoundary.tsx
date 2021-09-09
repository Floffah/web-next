import { Component, ContextType, ErrorInfo } from "react";
import { RouterContext } from "next/dist/shared/lib/router-context";

export default class ErrorBoundary extends Component<
    any,
    { hasError: boolean }
> {
    static contextType = RouterContext;
    context!: ContextType<typeof RouterContext>;

    constructor(props: any) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError(_err: Error) {
        return {
            hasError: true,
        };
    }

    componentDidCatch(e: Error, i: ErrorInfo) {
        console.error(e);
        console.error(i);
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="absolute translate-center">
                    <p>An error occured</p>
                </div>
            );
        }
        return this.props.children;
    }
}
