import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelsPanelComponent } from './channels-panel/channels-panel.component';
import { ChannelsListComponent } from './channels-list/channels-list.component';
import { ChannelDetailsComponent } from './channel-details/channel-details.component';
import { SharedModule } from '../shared/shared.module';
import { ChannelPageComponent } from './channel-page/channel-page.component';
import { RouterModule } from '@angular/router';
import { ChannelEpgComponent } from './channel-epg/channel-epg.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { PlayerAreaComponent } from './player-area/player-area.component';
import { PlayerControlBarComponent } from './player-control-bar/player-control-bar.component';
import { PlayerModule } from '../player/player.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PlayerModule,
    RouterModule.forChild([
      {path: '', component: ChannelPageComponent}
    ])
  ],
  declarations: [
    ChannelsPanelComponent,
    ChannelsListComponent,
    ChannelDetailsComponent,
    ChannelPageComponent,
    ChannelEpgComponent,
    ProgressBarComponent,
    PlayerAreaComponent,
    PlayerControlBarComponent,
  ],
})
export class ChannelsModule {}
