import { Injectable } from '@angular/core';
import { CastStateChanged, SessionStateChanged } from '@store/reducers/casting.reducer';
import { Store } from '@ngrx/store';
import { AppState } from '@store';
import { PlayerPlayingStateChanged, PlayerReady } from '@store/reducers/player.reducer';

const LIB_URL = 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1';

@Injectable({
  providedIn: 'root',
})
export class CastService {
  public player: cast.framework.RemotePlayer;
  public controller: cast.framework.RemotePlayerController;

  constructor(
    private store: Store<AppState>,
  ) {
    this.attachScript();
  }

  private attachScript() {
    const script = window['document'].createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', LIB_URL);
    window.document.body.appendChild(script);

    window.__onGCastApiAvailable = (isAvailable: boolean) => {
      if (isAvailable) {
        this.initializeCastApi();
        this.initRemotePlayer();
      }
    };
  }

  private initializeCastApi() {
    const context = cast.framework.CastContext.getInstance();

    context.setOptions({
      receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
      autoJoinPolicy: (chrome.cast as any).AutoJoinPolicy.ORIGIN_SCOPED,
    });

    context.addEventListener(
      cast.framework.CastContextEventType.CAST_STATE_CHANGED,
      (event) => this.store.dispatch(new CastStateChanged({ state: event.castState })),
    );
    context.addEventListener(
      cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
      (event) => this.store.dispatch(new SessionStateChanged({ state: event.sessionState })),
    );
  }

  public launchMedia(title: string, streamUrl: string) {
    const media: any = chrome.cast.media;
    const castSession = cast.framework.CastContext.getInstance().getCurrentSession();

    const mediaInfo = new media.MediaInfo(streamUrl, 'application/x-mpegURL');
    const request = new media.LoadRequest(mediaInfo);

    mediaInfo.metadata = new media.GenericMediaMetadata();
    mediaInfo.metadata.title = title;

    castSession.loadMedia(request);
  }

  private initRemotePlayer() {
    this.player = new cast.framework.RemotePlayer();
    this.controller = new cast.framework.RemotePlayerController(this.player);

    this.controller.addEventListener(cast.framework.RemotePlayerEventType.ANY_CHANGE, () => {
      this.store.dispatch(new PlayerPlayingStateChanged({ paused: this.player.isPaused }));
      this.store.dispatch(new PlayerReady({ ready: this.player.canPause }));
    });
  }
}
