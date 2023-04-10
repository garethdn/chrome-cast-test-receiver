import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

    public test: any;

    ngOnInit() {
        const context = cast.framework.CastReceiverContext.getInstance();
        const options = new cast.framework.CastReceiverOptions();
        const namespace = 'urn:x-cast:com.example.customwebreceiver';

        // Debug Logger
        const castDebugLogger = cast.debug.CastDebugLogger.getInstance();

        context.setLoggerLevel(cast.framework.LoggerLevel.DEBUG);

        // Enable debug logger and show a 'DEBUG MODE' overlay at top left corner.
        context.addEventListener(cast.framework.system.EventType.READY, () => {
            castDebugLogger.setEnabled(true);
        });

        context.addCustomMessageListener(namespace, (event) => {
            this.test = event;
            console.log('Received message', this.test);
        });

        context.start(options);
        console.log('Receiver app started.');
    }

}
