import { withSentryConfig } from '@sentry/nextjs';


const moduleExports = {

};


const SentryWebpackPluginOptions = {
    silent: true,
};


export default withSentryConfig(moduleExports, SentryWebpackPluginOptions);