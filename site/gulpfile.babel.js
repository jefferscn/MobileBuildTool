import del from "del";
import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import packageJson from "./package.json";
import runSequence from "run-sequence";
import webpack from "webpack";
import webpackConfig from "./webpack.config";
import WebpackDevServer from "webpack-dev-server";
import ServerWebpackConfig from './webpack.node.config';
import express from "express";

const PORT = process.env.PORT || 80 ;
const $ = gulpLoadPlugins({camelize: true});
const DEST_DIR = process.env.DEST_DIR || 'build';

// Main tasks
gulp.task('serve', () => runSequence('serve:clean', 'serve:start'));
gulp.task('dist', () => runSequence('dist:clean', `dist:${DEST_DIR}`));
gulp.task('clean', ['dist:clean', 'serve:clean']);
gulp.task('startrelease', () => runSequence('serve:clean', `dist:${DEST_DIR}`, 'serve:startRelease'));

// Remove all built files
gulp.task('serve:clean', cb => del(DEST_DIR, {dot: true, force: true}, cb));
gulp.task('dist:clean', cb => del([DEST_DIR], {dot: true, force: true}, cb));

// Start a livereloading development server
gulp.task('serve:start', () => {
    const config = webpackConfig(true, DEST_DIR, PORT);
    return new WebpackDevServer(webpack(config), {
        contentBase: '.',
        publicPath: "/generated/",
        watchDelay: 100
    })
        .listen(PORT, '0.0.0.0', (err) => {
            if (err) throw new $.util.PluginError('webpack-dev-server', err);

            $.util.log(`[${packageJson.name} serve]`, `Listening at 0.0.0.0:${PORT}`);
        });
});

gulp.task('serve:startRelease', () => {
    var app = express();
    app.use(express.static(DEST_DIR));
    app.listen(PORT, function (err) {
        if (err) throw new $.util.PluginError('express server', err);

        $.util.log(`[${packageJson.name} serve]`, `Listening at 0.0.0.0:${PORT}`);
    });
})

// Create a distributable package
gulp.task(`dist:${DEST_DIR}`,  cb => {
    const config = webpackConfig(false, DEST_DIR);
    webpack(config, (err, stats) => {
        if (err) throw new $.util.PluginError(DEST_DIR, err);

        $.util.log(`[${packageJson.name} dist]`, stats.toString({colors: true}));

        cb();
    });

    gulp.src([
        'index.html'
    ]).pipe(gulp.dest(DEST_DIR));
});

gulp.task('buildserver',()=>{
    ServerWebpackConfig.watch=true;
    webpack(ServerWebpackConfig,(err,stats) => {
        if (err) throw new $.util.PluginError(DEST_DIR, err);
        $.util.log(`[${ServerWebpackConfig.name} dist]`, stats.toString({colors: true}));
    })
});

gulp.task('buildserver:dist',()=>{
    ServerWebpackConfig.watch=false;
    webpack(ServerWebpackConfig,(err,stats) => {
        if (err) throw new $.util.PluginError(DEST_DIR, err);
        $.util.log(`[${ServerWebpackConfig.name} dist]`, stats.toString({colors: true}));
    })
});
