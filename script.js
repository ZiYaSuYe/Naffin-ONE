document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('.custom-video');
    const playBtn = document.querySelector('.play-btn');
    const progressBar = document.querySelector('.progress-bar');
    const timeDisplay = document.querySelector('.time');
    const fullscreenBtn = document.querySelector('.fullscreen-btn');

    // 播放/暂停控制
    playBtn.addEventListener('click', () => {
        video.paused ? video.play() : video.pause();
    });

    // 视频状态更新
    video.addEventListener('play', () => {
        playBtn.textContent = '⏸';
    });

    video.addEventListener('pause', () => {
        playBtn.textContent = '▶';
    });

    // 进度条更新
    video.addEventListener('timeupdate', () => {
        const progress = (video.currentTime / video.duration) * 100;
        progressBar.value = progress;
        
        // 时间格式化
        const formatTime = (seconds) => {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        };
        
        timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
    });

    // 进度跳转
    progressBar.addEventListener('input', (e) => {
        const time = (e.target.value / 100) * video.duration;
        video.currentTime = time;
    });

    // 全屏控制
    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            video.parentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });

    // 键盘控制
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            video.paused ? video.play() : video.pause();
        }
    });
});