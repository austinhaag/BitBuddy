import React from 'react';

/**
 * Render change percent helper
 *
 * @param {string} percent
 */
export const renderChangePercent = (percent) => {
    if(percent > 0) {
        return <span className="percent-raised">{percent}% &uarr;</span>
    } else if(percent < 0) {
        percent = Math.abs(percent);
        return <span className="percent-fallen">{percent}% &darr;</span>
    } else {
        percent = Math.abs(percent);
        return <span>{percent}%</span>
    }
}

/**
 * @param {string} value
 */
export const formatMarketVolume = (value) => {
    value = Math.trunc(value)
    value = parseFloat(value).toLocaleString()
    return value;
}

/**
 * @param {string} value
 */
export const formatMarketCap = (value) => {
    value = parseFloat(value).toLocaleString()
    return value;
}

/**
 * @param {string} value
 */
export const formatMarketPrice = (value) => {
    value = value.substring(0, 7)
    return value;
}
